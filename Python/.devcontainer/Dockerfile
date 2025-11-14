FROM python:3.12-slim

# OS deps you likely need for builds
RUN apt-get update && apt-get install -y --no-install-recommends \
    git build-essential curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Non-root user
RUN useradd -m -u 1000 -s /bin/bash vscode
USER vscode
WORKDIR /workspaces

COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip check

# Per-user virtualenv as default interpreter
ENV VIRTUAL_ENV=/home/vscode/.venv
RUN python -m venv "$VIRTUAL_ENV"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install --upgrade pip
RUN python -m pip install requests
