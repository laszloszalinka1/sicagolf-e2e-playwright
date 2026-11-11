pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    stages {
        stage('Verificar Caché y Permisos') {
            steps {
                sh 'chown -R jenkins:jenkins /var/jenkins_home/.cache || true'
                // Ya no borramos el navegador para evitar descargas innecesarias que gastan datos
            }
        }

        stage('Instalar Dependencias') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Asegurar Navegador Playwright') {
            steps {
                // Playwright validará si ya existe; si está en caché, no descargará nada nuevo
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