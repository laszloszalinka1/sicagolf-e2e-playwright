pipeline {
    agent any

    tools {
        nodejs 'Node26'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Limpiar Bloqueos e Instalar Navegador') {
            steps {
                // Elimina el archivo de bloqueo si quedó colgado de un intento previo
                sh 'rm -rf /var/jenkins_home/.cache/ms-playwright/__dirlock'
                // Instala el headless shell de forma limpia
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