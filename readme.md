<h1>default.conf</h1>

```
upstream nodes {
    server nodejs-queue-node1:3000;
    server nodejs-queue-node2:3000;

    location / {
        proxy_pass http://nodes;
    }
}
```