pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.48.0-noble'
            args '--user root' // Esto asegura que corra con permisos totales si necesita escribir en cachés
        }
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
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