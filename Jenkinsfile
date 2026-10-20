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
                dependencyCheck odcInstallation: 'DependencyCheck'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build --pull --rm -f "Dockerfile" -t blog:latest "."'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image blog:latest'
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
                sh 'nikto -h http://localhost:3000'
            }
        }
    }
}
