pipeline {
    agent any

    tools {
        nodejs 'Node22' // Actualizado a Node 22 para evitar problemas de compatibilidad
    }

    stages {
        stage('Corregir Permisos y Limpiar Caché') {
            steps {
                // Limpiamos la basura y los permisos de root anteriores
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