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
        
       stage('Ejecutar Pruebas') {
    steps {
        sh 'npx playwright test --project=chromium'
    }
}

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}