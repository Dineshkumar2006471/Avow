FROM python:3.12-slim

# Install system dependencies including ffmpeg for audio transcoding
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy API package requirements & source
COPY api/ /app/api/
COPY data/ /app/data/

# Install python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -e /app/api

WORKDIR /app/api

ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "uvicorn verdict.main:app --host 0.0.0.0 --port ${PORT:-8000}"]

