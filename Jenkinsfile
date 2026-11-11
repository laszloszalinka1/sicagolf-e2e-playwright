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
        
        stage('Instalar Navegador y Dependencias del Sistema') {
            steps {
                // El parámetro --with-deps descarga automáticamente las librerías faltantes como libglib-2.0
                sh 'npx playwright install --with-deps chromium-headless-shell'
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