// ── GitHub Commit API ───────────────────────────────────

/** A single commit from any GitHub repo. */
export interface GitCommit {
	sha: string;
	message: string;
	date: string;
	author: string;
	url: string;
	repo: string;
}

/**
 * Fetch recent commits from a GitHub repo.
 * Returns at most `perPage` commits, optionally filtered to a specific path.
 * On error (rate limiting, private repo, network failure) returns `null` so
 * callers can tell "upstream is unavailable" apart from "no commits", instead
 * of crashing or silently rendering an empty history.
 */
export async function fetchCommits(
	owner: string,
	repo: string,
	perPage = 50,
	path?: string
): Promise<GitCommit[] | null> {
	let url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`;
	if (path) url += `&path=${encodeURIComponent(path)}`;

	let res: Response;
	try {
		res = await fetch(url, {
			headers: { Accept: 'application/vnd.github+json' }
		});
	} catch (err) {
		console.error(`GitHub API request failed for ${owner}/${repo}:`, err);
		return null;
	}

	if (!res.ok) {
		console.error(`GitHub API error for ${owner}/${repo}: ${res.status}`);
		return null;
	}

	const data = await res.json();
	if (!Array.isArray(data)) {
		console.error(`GitHub API returned an unexpected payload for ${owner}/${repo}`);
		return null;
	}

	return data.map((c: any) => ({
		sha: c.sha,
		message: c.commit.message.split('\n')[0],
		date: c.commit.author.date,
		author: c.commit.author.name,
		url: c.html_url,
		repo
	}));
}
