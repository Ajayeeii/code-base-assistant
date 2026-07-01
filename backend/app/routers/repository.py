import logging

from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models.repository import RepositoryCloneRequest
from app.services.git_services import clone_repository
from app.services.file_service import FileService
from app.services.file_explanation_service import FileExplanationService
from app.utils.file_utils import build_file_tree
from app.services.bug_analysis_service import BugAnalysisService
from app.services.code_improvement_service import CodeImprovementService

router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"],
)

logger = logging.getLogger(__name__)


class ExplainFileRequest(BaseModel):
    path: str


@router.post("/clone")
def clone_repo(request: RepositoryCloneRequest):
    try:
        repo = clone_repository(str(request.url))

        return {
    "success": True,
    "message": "Repository cloned successfully.",
    "repository": repo["name"],
}

    except FileExistsError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        logger.exception("Failed to clone repository.")

    raise HTTPException(status_code=500, detail="Failed to clone repository.")


@router.get("/{repository_name}/tree")
def get_repository_tree(repository_name: str):
    print(f"repository_name = {repository_name}")

    repository_path = Path("app/workspace") / repository_name
    print(f"repository_path = {repository_path}")

    if not repository_path.exists():
        raise HTTPException(status_code=404, detail="Repository not found.")

    return build_file_tree(repository_path)


@router.get("/{repository_name}/file")
def get_file(repository_name: str, path: str):
    """
    Return the contents of a file inside the repository.
    """

    repository_path = Path("app/workspace") / repository_name

    if not repository_path.exists():
        raise HTTPException(status_code=404, detail="Repository not found.")

    file_service = FileService(repository_path)

    try:
        content = file_service.read_file(path)

        return {"content": content}

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found.")

    except Exception:
        logger.exception("Failed to read file.")

    raise HTTPException(status_code=500, detail="Unable to read the requested file.")


@router.post("/{repository_name}/explain")
def explain_file(
    repository_name: str,
    request: ExplainFileRequest,
):
    try:
        explanation = FileExplanationService.explain_file(
            repository=repository_name,
            path=request.path,
        )

        return {"explanation": explanation}

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found.")

    except Exception:
        logger.exception("AI explanation failed.")

    raise HTTPException(status_code=500, detail="Unable to explain the file.")


@router.post("/{repository_name}/find-bugs")
def find_bugs(
    repository_name: str,
    request: ExplainFileRequest,
):
    try:
        analysis = BugAnalysisService.analyze_file(
            repository=repository_name,
            path=request.path,
        )

        return {"analysis": analysis}

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found.")

    except Exception:
        logger.exception("Bug analysis failed.")

    raise HTTPException(status_code=500, detail="Unable to analyze the file.")


@router.post("/{repository_name}/improve")
def improve_code(
    repository_name: str,
    request: ExplainFileRequest,
):
    try:
        improvements = CodeImprovementService.improve_file(
            repository=repository_name,
            path=request.path,
        )

        return {"improvements": improvements}

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found.")

    except Exception:
        logger.exception("Code improvement failed.")

    raise HTTPException(
        status_code=500, detail="Unable to generate improvement suggestions."
    )
