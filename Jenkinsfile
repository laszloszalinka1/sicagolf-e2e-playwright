pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    stages {
        stage('Corregir Permisos y Limpiar Caché') {
            steps {
                sh 'chown -R jenkins:jenkins /var/jenkins_home/.cache || true'
                sh 'rm -rf /var/jenkins_home/.cache/ms-playwright/*'
            }
        }

        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Instalar Navegador Playwright') {
            steps {
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