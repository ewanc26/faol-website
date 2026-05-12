export interface GitCommit {
	sha: string;
	message: string;
	date: string;
	author: string;
	url: string;
}

export async function fetchCommits(
	owner: string,
	repo: string,
	perPage = 50
): Promise<GitCommit[]> {
	const res = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`,
		{
			headers: { Accept: 'application/vnd.github+json' }
		}
	);

	if (!res.ok) {
		console.error(`GitHub API error: ${res.status}`);
		return [];
	}

	const data = await res.json();

	return data.map((c: any) => ({
		sha: c.sha,
		message: c.commit.message.split('\n')[0],
		date: c.commit.author.date,
		author: c.commit.author.name,
		url: c.html_url
	}));
}
