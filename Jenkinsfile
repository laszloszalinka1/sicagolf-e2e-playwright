pipeline {
    agent any

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Instalar Navegadores de Playwright') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Ejecutar Pruebas') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}