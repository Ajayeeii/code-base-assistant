from pathlib import Path

IGNORE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
    "dist",
    "build",
}


def build_file_tree(directory: Path):
    """
    Recursively build a directory tree.
    """

    items = []

    for item in sorted(directory.iterdir(), key=lambda x: (x.is_file(), x.name.lower())):
        if item.name in IGNORE_DIRS:
            continue

        if item.is_dir():
            items.append(
                {
                    "name": item.name,
                    "type": "directory",
                    "children": build_file_tree(item),
                }
            )
        else:
            items.append(
                {
                    "name": item.name,
                    "type": "file",
                }
            )

    return items