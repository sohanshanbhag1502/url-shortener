from locust import HttpUser, task, between

class UserBehavior(HttpUser):
    wait_time = between(1, 5)  
    @task(3)  
    def load_frontend(self):
        self.client.get("/")

    @task(1)
    def load_backend(self):
        self.client.post("/api/shorten", json={"original": "https://www.google.com"})
        self.client.post("/api/geturl", json={"shortened": "q3Cql"})