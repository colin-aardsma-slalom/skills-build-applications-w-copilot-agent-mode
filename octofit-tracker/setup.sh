#!/bin/bash

# OctoFit Tracker Backend Setup Script

echo "======================================="
echo "OctoFit Tracker Backend Setup"
echo "======================================="

# Step 1: Create Python virtual environment
echo ""
echo "Step 1: Creating Python virtual environment..."
python3 -m venv octofit-tracker/backend/venv

if [ $? -eq 0 ]; then
    echo "✓ Virtual environment created successfully"
else
    echo "✗ Failed to create virtual environment"
    exit 1
fi

# Step 2: Activate virtual environment and install requirements
echo ""
echo "Step 2: Installing Python requirements..."
source octofit-tracker/backend/venv/bin/activate

if [ $? -eq 0 ]; then
    echo "✓ Virtual environment activated"
else
    echo "✗ Failed to activate virtual environment"
    exit 1
fi

pip install -r octofit-tracker/backend/requirements.txt

if [ $? -eq 0 ]; then
    echo "✓ All requirements installed successfully"
else
    echo "✗ Failed to install requirements"
    exit 1
fi

echo ""
echo "======================================="
echo "Setup Complete!"
echo "======================================="
echo ""
echo "To activate the virtual environment in the future, run:"
echo "  source octofit-tracker/backend/venv/bin/activate"
echo ""
