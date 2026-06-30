from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.models.repository import RepositoryCloneRequest
from app.services.git_services import clone_repository
from app.services.file_service import FileService
from app.utils.file_utils import build_file_tree

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)


@router.post("/clone")
def clone_repo(request: RepositoryCloneRequest):
    try:
        repo = clone_repository(str(request.url))


        return {
            "success": True,
            "message": "Repository cloned successfully.",
            "path": repo,
        }

    except FileExistsError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.get("/{repository_name}/tree")
def get_repository_tree(repository_name: str):
    print(f"repository_name = {repository_name}")

    repository_path = Path("app/workspace") / repository_name
    print(f"repository_path = {repository_path}")

    if not repository_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Repository not found."
        )

    return build_file_tree(repository_path)  


@router.get("/{repository_name}/file")
def get_file(repository_name: str, path: str):
    """
    Return the contents of a file inside the repository.
    """

    repository_path = Path("app/workspace") / repository_name

    if not repository_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Repository not found."
        )

    file_service = FileService(repository_path)

    try:
        content = file_service.read_file(path)

        return {
            "content": content
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )