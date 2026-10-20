pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                sh 'git pull origin main'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build --pull --rm -f "Dockerfile" -t blog:latest "."'
            }
        }

        stage('Trivy Scan') {
           steps {
               sh '''
               docker run --rm \
                 -v /var/run/docker.sock:/var/run/docker.sock \
                 aquasec/trivy:latest image blog:latest
              '''
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
               sh 'docker run --rm ghcr.io/sullo/nikto:latest -h 
        http://host.docker.internal:3000'
            }
        }
    }
}

