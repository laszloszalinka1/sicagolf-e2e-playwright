pipeline {
    agent any

    stages {
        stage('Preparar Entorno y Ejecutar Pruebas E2E') {
            steps {
                script {
                    try {
                        // Levanta db, backend, frontend y corre playwright en la misma red
                        sh 'docker compose up --build --exit-code-from playwright-tests'
                    } finally {
                        // Limpia los contenedores al terminar (incluso si falla algún test)
                        sh 'docker compose down -v'
                    }
                }
            }
        }
    }

    post {
        always {
            // Publica los reportes o trazas generados en el workspace
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}