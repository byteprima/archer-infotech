# Archer Infotech - Deployment Documentation

**Last Updated**: 2026-03-29
**Domain**: https://archerinfotech.in
**Status**: Live & Running

---

## Infrastructure Overview

| Component | Details |
|-----------|---------|
| **VPS Provider** | Contabo (or similar) |
| **VPS IP** | `173.212.212.178` |
| **OS** | Ubuntu 24.04.4 LTS |
| **PaaS** | Coolify v4.0.0-beta.470 |
| **Reverse Proxy** | Traefik v3.6.12 |
| **SSL** | Let's Encrypt (auto-renewed) |
| **Domain Registrar** | BigRock |

---

## Coolify Resources

### Application: archer-infotech

| Property | Value |
|----------|-------|
| **UUID** | `i5knr4obzv3hzjhrkl58rn12` |
| **Project** | My first project (`wp9fayf2kzcgfpxcuiaexrp8`) |
| **Environment** | production (`p96yjztqex8e2wn28f7pdlk1`) |
| **Server** | localhost (`tdnw576b2yf5rukdr3abfer3`) |
| **Build Pack** | Nixpacks |
| **Port** | 3000 |
| **FQDN** | `https://archerinfotech.in` |

### Database: PostgreSQL

| Property | Value |
|----------|-------|
| **UUID** | `h12dkwj5bgdqt2byqfgfmvdz` |
| **Image** | postgres:18-alpine |
| **Status** | running:healthy |
| **Internal URL** | `postgres://postgres:<password>@h12dkwj5bgdqt2byqfgfmvdz:5432/archer_infotech` |

### Other Services on Same Server

| Service | UUID | Domain |
|---------|------|--------|
| byteprima | `lull2r2tfv7bkptjmk9180va` | byteprima.com |

---

## GitHub Repository

| Property | Value |
|----------|-------|
| **URL** | https://github.com/byteprima/archer-infotech |
| **Branch** | main |
| **Account** | byteprima |

---

## Environment Variables

Set in Coolify for the application:

```env
DATABASE_URL=postgres://postgres:oOgdIkq14USw4b758R8c034bRZdRyMV5AIyxOBGqav4YtxY1funi23JfcTJ60YHy@h12dkwj5bgdqt2byqfgfmvdz:5432/archer_infotech
NEXT_PUBLIC_SITE_URL=https://archerinfotech.in
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Archer@123456
ADMIN_SESSION_SECRET=a7f3c9e2b1d8f4a6c0e5b7d3f9a2c4e6
```

---

## DNS Configuration (BigRock)

| Type | Host | Points To | TTL |
|------|------|-----------|-----|
| A | @ | 173.212.212.178 | 3600 |
| A | www | 173.212.212.178 | 3600 |

---

## Access URLs

| Purpose | URL |
|---------|-----|
| **Website** | https://archerinfotech.in |
| **Admin Panel** | https://archerinfotech.in/admin/login |
| **Coolify Dashboard** | https://coolify.byteprima.com |

### Admin Credentials

- **Username**: `admin`
- **Password**: `Archer@123456`

---

## VPS Access

Credentials stored in: `/Users/vinodpatil/openclaw-vm/.vm-credentials`

```bash
# SSH Access
ssh root@173.212.212.178

# Or with sshpass
source /Users/vinodpatil/openclaw-vm/.vm-credentials
sshpass -p "$VM_PASSWORD" ssh $VM_USER@$VM_IP
```

---

## Common Commands

### Check Application Status

```bash
# Via Coolify MCP
# Use: mcp__coolify__get_application with uuid: i5knr4obzv3hzjhrkl58rn12

# Via SSH
ssh root@173.212.212.178 "docker ps --filter 'name=i5knr4obzv3hzjhrkl58rn12'"
```

### View Application Logs

```bash
# Via Coolify MCP
# Use: mcp__coolify__application_logs with uuid: i5knr4obzv3hzjhrkl58rn12

# Via SSH
ssh root@173.212.212.178 "docker logs i5knr4obzv3hzjhrkl58rn12-<container_suffix> --tail 100"
```

### Restart Application

```bash
# Via Coolify MCP
# Use: mcp__coolify__control with resource: application, action: restart, uuid: i5knr4obzv3hzjhrkl58rn12
```

### Redeploy (Pull Latest Code)

```bash
# Via Coolify MCP
# Use: mcp__coolify__deploy with tag_or_uuid: i5knr4obzv3hzjhrkl58rn12
```

### Check Traefik Proxy

```bash
ssh root@173.212.212.178 "docker logs coolify-proxy --tail 50"
ssh root@173.212.212.178 "docker ps --filter 'name=coolify-proxy'"
```

### Database Access

```bash
# Connect to PostgreSQL
ssh root@173.212.212.178 "docker exec -it h12dkwj5bgdqt2byqfgfmvdz psql -U postgres -d archer_infotech"
```

---

## Troubleshooting

### Issue: HTTP returns 404 but HTTPS works

**Cause**: Traefik middleware conflict - multiple services defining `redirect-to-https` middleware.

**Solution**: Each service must use a unique middleware name:
- archer-infotech uses: `redirect-to-https` (Coolify auto-generated)
- byteprima uses: `redirect-to-https-byteprima`

### Issue: SSL Certificate Not Generating

**Cause**: DNS not pointing to server IP when Let's Encrypt tries to validate.

**Solution**:
1. Ensure DNS A record points to `173.212.212.178`
2. Wait for DNS propagation (check with `dig +short archerinfotech.in @8.8.8.8`)
3. Restart the application in Coolify to retry certificate generation

### Issue: Build Fails

**Common Causes**:
1. Missing environment variables
2. Node.js version mismatch
3. Dependency issues

**Solution**:
1. Check deployment logs in Coolify
2. Ensure all env vars are set
3. Nixpacks auto-detects Node.js version from package.json

### Issue: Database Connection Failed

**Solution**:
1. Verify PostgreSQL container is running: `docker ps --filter 'name=h12dkwj5bgdqt2byqfgfmvdz'`
2. Check DATABASE_URL uses internal Docker hostname (not localhost)
3. Ensure database `archer_infotech` exists

---

## Architecture

```
                                    ┌─────────────────────────────────────┐
                                    │          VPS (173.212.212.178)       │
                                    │                                      │
┌──────────┐    ┌──────────┐       │  ┌─────────────────────────────────┐ │
│  User    │───▶│ BigRock  │───DNS─┼─▶│     Traefik (coolify-proxy)    │ │
│ Browser  │    │   DNS    │       │  │     Ports: 80, 443, 8080       │ │
└──────────┘    └──────────┘       │  └───────────────┬─────────────────┘ │
                                    │                  │                   │
                                    │    ┌─────────────┴─────────────┐    │
                                    │    │                           │    │
                                    │    ▼                           ▼    │
                                    │ ┌─────────────────┐ ┌─────────────┐ │
                                    │ │  archer-infotech │ │  byteprima  │ │
                                    │ │   (Next.js)      │ │   (nginx)   │ │
                                    │ │   Port: 3000     │ │   Port: 80  │ │
                                    │ └────────┬─────────┘ └─────────────┘ │
                                    │          │                           │
                                    │          ▼                           │
                                    │ ┌─────────────────┐                  │
                                    │ │   PostgreSQL    │                  │
                                    │ │   Port: 5432    │                  │
                                    │ └─────────────────┘                  │
                                    │                                      │
                                    │  ┌─────────────────────────────────┐ │
                                    │  │     Coolify (Management)        │ │
                                    │  │     Port: 8000                  │ │
                                    │  │     coolify.byteprima.com       │ │
                                    │  └─────────────────────────────────┘ │
                                    └─────────────────────────────────────┘
```

---

## Deployment Workflow

1. **Push code to GitHub** (`byteprima/archer-infotech`, branch: `main`)
2. **Trigger deployment** via Coolify (manual or webhook)
3. **Nixpacks builds** Docker image from source
4. **Coolify deploys** container with rolling update
5. **Traefik routes** traffic and manages SSL

### Manual Deployment Steps

```bash
# 1. Push changes
git add .
git commit -m "your changes"
git push origin main

# 2. Deploy via Coolify MCP
# Use: mcp__coolify__deploy with tag_or_uuid: i5knr4obzv3hzjhrkl58rn12
```

---

## Backup Considerations

### Database Backup

```bash
# Create backup
ssh root@173.212.212.178 "docker exec h12dkwj5bgdqt2byqfgfmvdz pg_dump -U postgres archer_infotech > /root/archer_backup_$(date +%Y%m%d).sql"

# Download backup
scp root@173.212.212.178:/root/archer_backup_*.sql ./backups/
```

### Important Files on Server

| Path | Description |
|------|-------------|
| `/data/coolify/` | Coolify data directory |
| `/data/coolify/source/.env` | Coolify environment (BACKUP THIS!) |
| `/data/coolify/proxy/` | Traefik configuration |

---

## SSL Certificate

| Property | Value |
|----------|-------|
| **Issuer** | Let's Encrypt (R13) |
| **Valid From** | Mar 29, 2026 |
| **Expires** | Jun 27, 2026 |
| **Auto-Renewal** | Yes (via Traefik) |

---

## Contact & Resources

- **Coolify Docs**: https://coolify.io/docs
- **Nixpacks Docs**: https://nixpacks.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Traefik Docs**: https://doc.traefik.io/traefik/

---

## Change Log

| Date | Change |
|------|--------|
| 2026-03-29 | Initial deployment to Coolify |
| 2026-03-29 | DNS migrated from BigRock to VPS |
| 2026-03-29 | Fixed Traefik middleware conflict for HTTP redirect |
