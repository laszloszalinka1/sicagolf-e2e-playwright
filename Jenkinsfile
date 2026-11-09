pipeline {
    agent any

    tools {
        nodejs 'Node26' // Debe coincidir exactamente con el nombre que le pusiste en las herramientas
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Instalar Navegadores de Playwright') {
            steps {
                sh 'npx playwright install'
            }
        }
        stage('Ejecutar Pruebas') {
            steps {
                sh 'npx playwright test'
            }
        }
        stage('Instalar Navegadores de Playwright') {
            steps {
            // Forzamos la instalación limpia y evitamos que se quede colgado en el stream
            sh 'npx playwright install chromium'
    }
}
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}