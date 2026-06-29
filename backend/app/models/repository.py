from pydantic import BaseModel, HttpUrl


class RepositoryCloneRequest(BaseModel):
    url: HttpUrl