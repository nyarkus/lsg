# Решение "unknown key '%INSTALLED_DB%' in local database"
Если ты видишь такое предупреждение при установке - это не даёт тебе обновлять пакеты, на которые он жалуется.

Я хз почему это возникает, но вот решение:

```bash
sudo find /var/lib/pacman/local/ -type f -name "desc" -exec sed -i '/^%INSTALLED_DB%$/,+2d' {} \;
```
