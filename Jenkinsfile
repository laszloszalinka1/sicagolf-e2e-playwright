pipeline {
    agent any

    tools {
        nodejs 'Node22'
    }

    stages {
        stage('Instalar Dependencias de Sistema (Root)') {
            steps {
                // Forzamos la instalación usando sudo o permisos de root directamente en el contenedor del agente
                sh '''
                    echo "=== Instalando dependencias gráficas para Playwright ==="
                    apt-get update && apt-get install -y \
                    libglib2.0-0 \
                    libnss3 \
                    libnspr4 \
                    libatk1.0-0 \
                    libatk-bridge2.0-0 \
                    libcups2 \
                    libdrm2 \
                    libdbus-1-3 \
                    libexpat1 \
                    libfontconfig1 \
                    libgbm1 \
                    libpango-1.0-0 \
                    libx11-6 \
                    libx11-xcb1 \
                    libxcb1 \
                    libxcomposite1 \
                    libxcursor1 \
                    libxdamage1 \
                    libxext6 \
                    libxi6 \
                    libxrandr2 \
                    libxrender1 \
                    libxss1 \
                    libxtst1
                '''
            }
        }

        stage('Corregir Permisos y Limpiar Caché') {
            steps {
                sh 'chown -R jenkins:jenkins /var/jenkins_home/.cache || true'
                sh 'rm -rf /var/jenkins_home/.cache/ms-playwright/chromium_headless_shell-1200 /var/jenkins_home/.cache/ms-playwright/ffmpeg-1011'
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