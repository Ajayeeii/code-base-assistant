from pathlib import Path

from git import Repo

WORKSPACE_DIR = Path("app/workspace")


def clone_repository(repo_url: str) -> str:
    """
    Clone a GitHub repository into the local workspace.

    Returns:
        The local path of the cloned repository.
    """

    WORKSPACE_DIR.mkdir(parents=True, exist_ok=True)

    repo_name = repo_url.rstrip("/").split("/")[-1]
    destination = WORKSPACE_DIR / repo_name

    if destination.exists():
        raise FileExistsError(f"Repository '{repo_name}' already exists.")

    Repo.clone_from(repo_url, destination)

    return {
        "name": repo_name,
        "path": str(destination),
    }
