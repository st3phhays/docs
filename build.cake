///////////////////////////////////////////////////////////////////////////////
// Tools
///////////////////////////////////////////////////////////////////////////////

#tool dotnet:https://pkgs.dev.azure.com/cake-contrib/Home/_packaging/addins/nuget/v3/index.json?package=KuduSync.Tool&version=1.5.4-g13cb5857b6

///////////////////////////////////////////////////////////////////////////////
// Addins
///////////////////////////////////////////////////////////////////////////////

#addin nuget:?package=Cake.Git&version=0.22.0
#addin nuget:?package=Cake.Kudu&version=1.0.1
#addin nuget:?package=Cake.Yarn&version=0.4.8

///////////////////////////////////////////////////////////////////////////////
// Scripts
///////////////////////////////////////////////////////////////////////////////

#load "buildData.cake"

///////////////////////////////////////////////////////////////////////////////
// Arguments
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");
var port = Argument("port", 5080);

///////////////////////////////////////////////////////////////////////////////
// Setup
///////////////////////////////////////////////////////////////////////////////

Setup<BuildData>(context =>
{
    Information("Setting up BuildData...");

    var buildData = new BuildData(context);

    return buildData;
});

var projectPath = "./Docs.csproj";

///////////////////////////////////////////////////////////////////////////////
// Tasks
///////////////////////////////////////////////////////////////////////////////

Task("OS-test")
    .Does(() =>
{
    Information(Context.Environment.Platform.Family);
});
Task("Clean")
    .Does<BuildData>((context, buildData) =>
{
    var directoriesToClean = new []{
        buildData.PublishDirectory,
        buildData.OutputDirectory,
        "./bin",
        "./obj",
        "./temp",
        "./wwwroot"
    };

    CleanDirectories(directoriesToClean);
});

Task("Yarn-Install")
    .WithCriteria(() => FileExists("./package.json"), "package.json file not found in repository")
    .IsDependentOn("Clean")
    .Does(() =>
{
    if (BuildSystem.IsLocalBuild)
    {
        Information("Running yarn install...");
        Yarn.Install();
    }
    else
    {
        Information("Running yarn install --immutable...");
        Yarn.Install(settings => settings.ArgumentCustomization = args => args.Append("--immutable"));
    }
});

Task("Run-Choco-Theme")
    .IsDependentOn("Yarn-Install")
    .Does(() =>
{
    Yarn.RunScript("choco-theme");
});

Task("Statiq-Preview")
    .IsDependentOn("Run-Choco-Theme")
    .Does<BuildData>((context, buildData) =>
{
    var settings = new DotNetCoreRunSettings {
      Configuration = configuration
    };

    DotNetCoreRun(projectPath, new ProcessArgumentBuilder().Append(string.Format("preview --port {0} --output \"{1}\"", port, buildData.OutputDirectory)), settings);
});

Task("Statiq-Build")
    .IsDependentOn("Run-Choco-Theme")
    .Does<BuildData>((context, buildData) =>
{
    var settings = new DotNetCoreRunSettings {
      Configuration = configuration
    };

    DotNetCoreRun(projectPath, new ProcessArgumentBuilder().Append(string.Format("--output \"{0}\"", buildData.OutputDirectory)), settings);
});

Task("Statiq-LinkValidation")
    .IsDependentOn("Run-Choco-Theme")
    .Does<BuildData>((context, buildData) =>
{
    var settings = new DotNetCoreRunSettings {
      Configuration = configuration,
      ArgumentCustomization = args => args.Append("-a ValidateRelativeLinks=Error -a ValidateAbsoluteLinks=Error")
    };

    DotNetCoreRun(projectPath, new ProcessArgumentBuilder().Append(string.Format("--output \"{0}\"", buildData.OutputDirectory)), settings);
});

Task("Publish-Documentation")
    .IsDependentOn("Statiq-Build")
    .Does<BuildData>((context, buildData) =>
{
    var sourceCommit = GitLogTip("./");

    CleanDirectory(buildData.PublishDirectory);
    var publishFolder = buildData.PublishDirectory.Combine(DateTime.Now.ToString("yyyyMMdd_HHmmss"));

    Information("Publishing Folder: {0}", publishFolder);
    Information("Getting publish branch...");

    if (!string.IsNullOrWhiteSpace(buildData.GitHubUserName) && !string.IsNullOrWhiteSpace(buildData.GitHubPassword))
    {
        Information("Cloning repository using username and password...");
        GitClone(buildData.DeployRemote, publishFolder, buildData.GitHubUserName, buildData.GitHubPassword, new GitCloneSettings{ BranchName = buildData.DeployBranch });
    }
    else if (!string.IsNullOrWhiteSpace(buildData.GitHubToken))
    {
        Information("Cloning repository using token...");
        GitClone(buildData.DeployRemote, publishFolder, buildData.GitHubToken, "x-oauth-basic", new GitCloneSettings{ BranchName = buildData.DeployBranch });
    }
    else
    {
        Information("Cloning repository anonymously...");
        GitClone(buildData.DeployRemote, publishFolder, new GitCloneSettings{ BranchName = buildData.DeployBranch });
    }

    Information("Sync output files...");

    Kudu.Sync(buildData.OutputDirectory, publishFolder, new KuduSyncSettings {
        ArgumentCustomization = args=>args.Append("--ignore").AppendQuoted(".git;CNAME")
    });

    if (GitHasUncommitedChanges(publishFolder))
    {
        Information("Stage all changes...");
        GitAddAll(publishFolder);

        if (GitHasStagedChanges(publishFolder))
        {
            Information("Commit all changes...");
            GitCommit(
                publishFolder,
                sourceCommit.Committer.Name,
                sourceCommit.Committer.Email,
                string.Format("Continuous Integration Publish: {0}\r\n{1}", sourceCommit.Sha, sourceCommit.Message)
            );

            Information("Pushing all changes...");

            if (!string.IsNullOrWhiteSpace(buildData.GitHubUserName) && !string.IsNullOrWhiteSpace(buildData.GitHubPassword))
            {
                Information("Pushing with username and password...");
                GitPush(publishFolder, buildData.GitHubUserName, buildData.GitHubPassword, buildData.DeployBranch);
            }
            else
            {
                Information("Pushing with token...");
                GitPush(publishFolder, buildData.GitHubToken, "x-oauth-basic", buildData.DeployBranch);
            }
        }
    }
});

Task("Default")
    .IsDependentOn("Statiq-Preview");

RunTarget(target);
