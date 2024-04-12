try {
    # Default port
    $defaultPort = 5080

    # Check if any arguments are passed
    if ($args.Count -ge 1) {
        # Use the first argument as the port
        $port = $args[0]
    } else {
        # Use the default port if no argument is provided
        $port = $defaultPort
    }

    Push-Location $PSScriptRoot
    dotnet tool restore
    dotnet cake --port $port
} finally {
    Pop-Location
}
