import ErrorService from "./error.service.js";

export default class GithubService {

    constructor() {
    }

    async getUser(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new ErrorService('User not found', 404);
                }

                throw new ErrorService('Fetch user', 500);
            }
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching GitHub user:', error);
            throw error;
        }
    }

    async getRepos(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!response.ok) {
                throw new Error(`Error fetching repositories: ${response.statusText}`);
            }
            const reposData = await response.json();
            const reposInfo = [];

            reposData.forEach((repo) => {
                reposInfo.push({
                    name: repo.name,
                    full_name: repo.full_name,
                    description: repo.description,
                    url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language,
                    created_at: repo.created_at,
                    updated_at: repo.updated_at
                });
            });

            return reposInfo;
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
            throw error;
        }
    }

    async getLanguages(repo) {
        try {
            const response = await fetch(`https://api.github.com/repos/${repo}/languages`);
            if (!response.ok) {
                throw new Error(`Error fetching languages: ${response.statusText}`);
            }
            const languagesData = await response.json();
            return languagesData;
        } catch (error) {
            console.error('Error fetching GitHub languages:', error);
            throw error;
        }
    }

}