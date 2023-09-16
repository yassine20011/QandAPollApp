if ($args.Count -eq 0) {
    Write-Host "Error: No argument provided." -ForegroundColor Red
    Write-Host "Valid arguments are:" -ForegroundColor Yellow
    Write-Host "  - 'app' for the React app" -ForegroundColor Yellow
    Write-Host "  - 'backend' for the Django backend" -ForegroundColor Yellow
    exit 1
}

$AppToRun = $args[0]

$rootDir = "C:\Users\AMJAD\Desktop\poll"
$getCurrentDir = Get-Location

# Check if the virtual environment exists
if (!(Test-Path -Path "$rootDir\env")) {
    Write-Host "Error: Virtual environment not found." -ForegroundColor Red
    Write-Host "Attempting to set up the virtual environment..." -ForegroundColor Yellow

    # Set up the virtual environment
    py -m venv env
    if ($?) {
        Write-Host "Virtual environment setup complete." -ForegroundColor Green

        if ($getCurrentDir -eq $rootDir) {
            .\env\Scripts\Activate
        } else {
            Set-Location -Path $rootDir
            .\env\Scripts\Activate
        }
        Write-Host "Environment activated." -ForegroundColor Green
        Write-Host "Installing backend dependencies..." -ForegroundColor Yellow

        # Install backend dependencies
         pip install -r "$rootDir\backend\requirements.txt"
        if ($?) {
            Write-Host "Backend dependencies installed." -ForegroundColor Green
        } else {
            Write-Host "Error: Failed to install backend dependencies." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "Error: Failed to set up the virtual environment." -ForegroundColor Red
        exit 1
    }
}else{
    if ($getCurrentDir -eq $rootDir) {
        .\env\Scripts\Activate
    } else {
        Set-Location -Path $rootDir
        .\env\Scripts\Activate
    }
}


if ($AppToRun -eq "app") {
    Set-Location -Path "$rootDir\app"
    npm run dev
    exit 0
} elseif ($AppToRun -eq "backend") {
    Set-Location -Path "$rootDir\backend"
    py manage.py runserver
    exit 0
} else {
    Write-Host "Error: Invalid argument." -ForegroundColor Red
    Write-Host "Valid arguments are:" -ForegroundColor Yellow
    Write-Host "  - 'app' for the React app" -ForegroundColor Yellow
    Write-Host "  - 'backend' for the Django backend" -ForegroundColor Yellow
    exit 1
}
