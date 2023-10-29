$validArguments = @('app', '.\app\', 'backend', '.\backend\', '-m', '-mk', '-c', '-r')

if ($args.Count -eq 0 -or $args[0] -notin $validArguments) {
    Write-Host "Error: Invalid or no argument provided." -ForegroundColor Red
    Write-Host "Valid arguments are:" -ForegroundColor Yellow
    Write-Host "  - 'app' or '.\app\' for the React app" -ForegroundColor Yellow
    Write-Host "  - 'backend' or '.\backend\' for the Django backend" -ForegroundColor Yellow
    Write-Host "  - '-m' to run migrations" -ForegroundColor Yellow
    Write-Host "  - '-mk' to make migrations" -ForegroundColor Yellow
    Write-Host "  - '-c' to create a superuser" -ForegroundColor Yellow
    Write-Host "  - '-r' to run the app" -ForegroundColor Yellow
    exit 1
}

$AppToRun = $args[0]

$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$rootDir = Join-Path $scriptDir 'your_project_root_directory'

if (!(Test-Path -Path (Join-Path $rootDir 'env'))) {
    Write-Host "Error: Virtual environment not found." -ForegroundColor Red
    Write-Host "Attempting to set up the virtual environment..." -ForegroundColor Yellow

    py -m venv (Join-Path $rootDir 'env')
    if ($?) {
        Write-Host "Virtual environment setup complete." -ForegroundColor Green
        . (Join-Path $rootDir 'env\Scripts\Activate')
        Write-Host "Environment activated." -ForegroundColor Green
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow

        pip install -r (Join-Path $rootDir 'backend\requirements.txt')
        if ($?) {
            Write-Host "Backend dependencies installed." -ForegroundColor Green
        }
        else {
            Write-Host "Error: Failed to install backend dependencies." -ForegroundColor Red
            exit 1
        }
    }
    else {
        Write-Host "Error: Failed to set up the virtual environment." -ForegroundColor Red
        exit 1
    }
}
else {
    . (Join-Path $rootDir 'env\Scripts\Activate')
}

if ($AppToRun -eq 'app' -or $AppToRun -eq '.\app\') {
    Set-Location -Path (Join-Path $rootDir 'app')
    npm run dev
}
elseif ($AppToRun -eq 'backend' -or $AppToRun -eq '.\backend\') {
    Set-Location -Path (Join-Path $rootDir 'backend')
    py manage.py runserver
}
elseif ($AppToRun -eq '-m') {
    py (Join-Path $rootDir 'backend\manage.py') migrate
}
elseif ($AppToRun -eq '-mk') {
    py (Join-Path $rootDir 'backend\manage.py') makemigrations
}
elseif ($AppToRun -eq '-c') {
    py (Join-Path $rootDir 'backend\manage.py') createsuperuser
}
elseif ($AppToRun -eq '-r') {
    py (Join-Path $rootDir 'backend\manage.py') runserver
}
