from fastapi import APIRouter, HTTPException

from app.models.repository import RepositoryCloneRequest
from app.services.git_services import clone_repository

from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.utils.file_utils import build_file_tree

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)


@router.post("/clone")
def clone_repo(request: RepositoryCloneRequest):
    try:
        local_path = clone_repository(str(request.url))

        return {
            "success": True,
            "message": "Repository cloned successfully.",
            "path": local_path,
        }

    except FileExistsError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
@router.get("/{repository_name}/tree")
def get_repository_tree(repository_name: str):
    """
    Return the directory tree of a cloned repository.
    """

    repository_path = Path("app/workspace") / repository_name

    if not repository_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Repository not found."
        )

    return build_file_tree(repository_path)     