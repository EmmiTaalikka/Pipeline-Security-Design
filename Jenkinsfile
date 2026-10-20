pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                sh 'git pull origin main'
            }
        }

        stage('Dependency Check') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    dependencyCheck odcInstallation: 'DependencyCheck'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Build skipped for security pipeline testing'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'docker run --rm aquasec/trivy:latest image blog:latest'
            }
        }

        stage('Run') {
            steps {
                sh 'docker stop blog || true'
                sh 'docker rm blog || true'
                sh 'docker run -d -p 3000:3000 --name blog blog'
            }
        }

        stage('Nikto Scan') {
            steps {
                sh 'docker run --rm ghcr.io/sullo/nikto:latest -h http://localhost:3000'
            }
        }
    }
}
