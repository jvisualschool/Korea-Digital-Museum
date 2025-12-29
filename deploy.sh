#!/bin/bash

# Configuration
KEY="~/.ssh/jvibeschool_org.pem"
USER="bitnami"
HOST="15.164.161.165"
REMOTE_BASE="/opt/bitnami/apache/htdocs"
TARGET_DIR="E_MUSEUM_GALLERY"
BACKUP_DIR="E_MUSEUM_BACKUPS"

echo "=== Starting Deployment with Backup ==="

# 1. SSH to Server: Create Backup & Prune Old Backups
echo "Step 1: Creating backup on remote server..."
ssh -i $KEY -o StrictHostKeyChecking=no $USER@$HOST << EOF
    # Ensure backup directory exists
    mkdir -p $REMOTE_BASE/$BACKUP_DIR
    
    # Create timestamped backup of the current live directory
    TIMESTAMP=\$(date +%Y%m%d_%H%M%S)
    if [ -d "$REMOTE_BASE/$TARGET_DIR" ]; then
        echo "   -> Backing up '$TARGET_DIR' to 'backup_\$TIMESTAMP.tar.gz'"
        tar -czf $REMOTE_BASE/$BACKUP_DIR/backup_\$TIMESTAMP.tar.gz -C $REMOTE_BASE $TARGET_DIR
    else
        echo "   -> Warning: Target directory does not exist yet. Skipping backup."
    fi

    # Prune old backups (Keep Max 5)
    cd $REMOTE_BASE/$BACKUP_DIR
    COUNT=\$(ls -1 backup_*.tar.gz 2>/dev/null | wc -l)
    if [ \$COUNT -gt 5 ]; then
        echo "   -> Cleaning up old backups (Current count: \$COUNT)"
        ls -t backup_*.tar.gz | tail -n +6 | xargs rm -f
    fi
EOF

# 2. Upload Files
echo "Step 2: Uploading new files..."
# Make sure remote target dir exists (in case it's a fresh deploy, though backup logic handled it)
ssh -i $KEY -o StrictHostKeyChecking=no $USER@$HOST "mkdir -p $REMOTE_BASE/$TARGET_DIR"

# Upload specific files/folders
scp -i $KEY -o StrictHostKeyChecking=no index.html proxy.php $USER@$HOST:$REMOTE_BASE/$TARGET_DIR/
scp -i $KEY -o StrictHostKeyChecking=no -r css js img BG $USER@$HOST:$REMOTE_BASE/$TARGET_DIR/

echo "=== Deployment Complete ==="
