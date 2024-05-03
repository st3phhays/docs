---
order: 10
xref: package-validator-rules
title: Package Validator Rules
description: Information on the Package Validator rules
hideChildPages: true
---

<p>There are 4 different types of Package Validator rules:</p>

<ul>
	<li><a href="#requirements">Requirements</a></li>
	<li><a href="#guidelines">Guidelines</a></li>
	<li><a href="#suggestions">Suggestions</a></li>
	<li><a href="#notes">Notes</a></li>
</ul>

<h2>Requirements</h2>

<p>Requirements represent the minimum quality of a package that is acceptable. When a package version has failed requirements, the package version requires fixing and/or response by the maintainer. Provided a Requirement has flagged correctly, it must be fixed before the package version can be approved. The exact same version should be uploaded during moderation review.</p>

<div class="row mt-3 mt-md-4 ms-md-n5 ms-xl-n3">
	@foreach (IDocument child in OutputPages.GetChildrenOf(Document).OnlyRequirements())
	{
		object[] childTreePath = child.Get<object[]>(Keys.TreePath);

		<div class="col-lg-6 col-xl-4 pb-4">
			<div class="card card-body card-link card-index">
				<div class="circle">
					<i class="fa-solid fa-file" aria-hidden="true"></i>
				</div>
				<div class="d-flex flex-column ps-3">
					<p class="h5 fw-bold card-title"><a class="stretched-link" href="@child.GetLink()" title='@child.GetTitle()'>@child.GetTitle()</a></p>
					@if (child.ContainsKey(WebKeys.Description))
					{
						<p class="card-content">@(child.Get(WebKeys.Description))</p>
					}
				</div>
			</div>
		</div>
	}
</div>

<h2>Guidelines</h2>

<p>Guidelines are strong suggestions that improve the quality of a package version. These are considered something to fix for next time to increase the quality of the package. Over time Guidelines can become Requirements. A package version can be approved without addressing Guideline comments but will reduce the quality of the package.</p>

<div class="row mt-3 mt-md-4 ms-md-n5 ms-xl-n3">
	@foreach (IDocument child in OutputPages.GetChildrenOf(Document).OnlyGuidelines())
	{
		object[] childTreePath = child.Get<object[]>(Keys.TreePath);

		<div class="col-lg-6 col-xl-4 pb-4">
			<div class="card card-body card-link card-index">
				<div class="circle">
					<i class="fa-solid fa-file" aria-hidden="true"></i>
				</div>
				<div class="d-flex flex-column ps-3">
					<p class="h5 fw-bold card-title"><a class="stretched-link" href="@child.GetLink()" title='@child.GetTitle()'>@child.GetTitle()</a></p>
					@if (child.ContainsKey(WebKeys.Description))
					{
						<p class="card-content">@(child.Get(WebKeys.Description))</p>
					}
				</div>
			</div>
		</div>
	}
</div>

<h2>Suggestions</h2>

<p>Suggestions are either newly introduced items that will later become Guidelines or items that are don't carry enough weight to become a Guideline. Either way they should be considered. A package version can be approved without addressing Suggestion comments.</p>

<div class="row mt-3 mt-md-4 ms-md-n5 ms-xl-n3">
	@foreach (IDocument child in OutputPages.GetChildrenOf(Document).OnlySuggestions())
	{
		object[] childTreePath = child.Get<object[]>(Keys.TreePath);

		<div class="col-lg-6 col-xl-4 pb-4">
			<div class="card card-body card-link card-index">
				<div class="circle">
					<i class="fa-solid fa-file" aria-hidden="true"></i>
				</div>
				<div class="d-flex flex-column ps-3">
					<p class="h5 fw-bold card-title"><a class="stretched-link" href="@child.GetLink()" title='@child.GetTitle()'>@child.GetTitle()</a></p>
					@if (child.ContainsKey(WebKeys.Description))
					{
						<p class="card-content">@(child.Get(WebKeys.Description))</p>
					}
				</div>
			</div>
		</div>
	}
</div>

<h2>Notes</h2>

<p>Notes typically flag things for both you and the reviewer to go over. Sometimes this is the use of things that may or may not be necessary given the constraints of what you are trying to do and/or are harder for automation to flag for other reasons. Items found in Notes might be Requirements depending on the context. A package version can be approved without addressing Note comments.</p>

<div class="row mt-3 mt-md-4 ms-md-n5 ms-xl-n3">
	@foreach (IDocument child in OutputPages.GetChildrenOf(Document).OnlyNotes())
	{
		object[] childTreePath = child.Get<object[]>(Keys.TreePath);

		<div class="col-lg-6 col-xl-4 pb-4">
			<div class="card card-body card-link card-index">
				<div class="circle">
					<i class="fa-solid fa-file" aria-hidden="true"></i>
				</div>
				<div class="d-flex flex-column ps-3">
					<p class="h5 fw-bold card-title"><a class="stretched-link" href="@child.GetLink()" title='@child.GetTitle()'>@child.GetTitle()</a></p>
					@if (child.ContainsKey(WebKeys.Description))
					{
						<p class="card-content">@(child.Get(WebKeys.Description))</p>
					}
				</div>
			</div>
		</div>
	}
</div>