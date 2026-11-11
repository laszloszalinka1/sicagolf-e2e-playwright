pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Instalar Navegador Playwright') {
            steps {
                // Instalamos solo el navegador sin intentar modificar el sistema operativo (--with-deps)
                sh 'npx playwright install chromium-headless-shell'
            }
        }
        
        stage('Ejecutar Pruebas') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}