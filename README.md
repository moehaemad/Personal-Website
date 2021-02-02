# Personal Website

---

Hosting on AWS EC2 Elastic Beanstalk instance with a Relational Database Integration (AWS RDS PostgreSQL) using an NGINX configured proxy server.

>note: this page sends emails to and between one email in the configuration and will not go anywhere else.

Routes: (for STFC):

validation:
/checkuser/:username/:pass

| Operation       | Route           |
| ------------- |:-------------:|
| Validate  | /checkuser/:username/:pass |
| Create  | /createuser/:username/:pass |
| Read    | TODO      |
| Update  | TODO      |
| Delete  | TODO      |