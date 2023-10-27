pipeline {
    agent { 
        node {
            label 'nas01'
            }
      }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build') {
            steps {
                echo "Building.."
                sh '''
                echo "1234" > text.txt
                ls -al
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                cat text.txt
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}