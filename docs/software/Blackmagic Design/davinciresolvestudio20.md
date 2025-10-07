# DaVinci Resolve Studio 20+
1. Качаем [отсюда](https://www.blackmagicdesign.com/products/davinciresolve). Если прошло уже много лет и 20 версия не актуальна - качаем [отсюда](https://www.blackmagicdesign.com/support/)
2. Перекидываем архив в путь ~/.cache/yay/davinci-resolve-studio/
3. Смотрим, чтобы на root диске было >~50 гигабайт. 
4. Устанавливаем пакет !aurpkg[davinci-resolve-studio] 
5.  Крякаем давинчи:
```bash
sudo /usr/bin/perl -pi -e 's/\x74\x11\xe8\x21\x23\x00\x00/\xeb\x11\xe8\x21\x23\x00\x00/g' /opt/resolve/bin/resolve
```
!!! seealso
    Чтобы освободить место на диске можно прописать `yay -Sc` - это почистит кеш

## Troubleshooting
### Кряк не сработал
Такое возможно, выполни это:
```bash
cd /opt/resolve/libs && sudo mkdir disabled-libraries && sudo mv libglib* libgio* libgmodule* disabled-libraries
```
# DaVinci Resolve Studio 20.1.1+
```bash
cd /opt/resolve
sudo perl -pi -e 's/\x03\x00\x89\x45\xFC\x83\x7D\xFC\x00\x74\x11\x48\x8B\x45\xC8\x8B/\x03\x00\x89\x45\xFC\x83\x7D\xFC\x00\xEB\x11\x48\x8B\x45\xC8\x8B/' bin/resolve
sudo perl -pi -e 's/\x74\x11\x48\x8B\x45\xC8\x8B\x55\xFC\x89\x50\x58\xB8\x00\x00\x00/\xEB\x11\x48\x8B\x45\xC8\x8B\x55\xFC\x89\x50\x58\xB8\x00\x00\x00/' bin/resolve
sudo perl -pi -e 's/\x41\xb6\x01\x84\xc0\x0f\x84\xb0\x00\x00\x00\x48\x85\xdb\x74\x08\x45\x31\xf6\xe9\xa3\x00\x00\x00/\x41\xb6\x00\x84\xc0\x0f\x84\xb0\x00\x00\x00\x48\x85\xdb\x74\x08\x45\x31\xf6\xe9\xa3\x00\x00\x00/' bin/resolve
echo -e "LICENSE blackmagic davinciresolvestudio 999999 permanent uncounted\n  hostid=ANY issuer=CGP customer=CGP issued=28-dec-2023\n  akey=0000-0000-0000-0000 _ck=00 sig=\"00\"" | sudo tee .license/blackmagic.lic
```
(скрипт этот был найден на [этой странице рутрекера](https://rutracker.org/forum/viewtopic.php?t=6088055&start=270))

## Troubleshooting
### При проблемах с h264/265:
Попробуй удалить давинчи и снести эти папки:
```bash
rm -rf ~/.local/share/DaVinciResolve
rm -rf ~/.config/DaVinciResolve
rm -rf ~/.cache/DaVinciResolve
rm -rf ~/Documents/BlackmagicDesign sudo
rm -rf /usr/share/applications/com.blackmagicdesign.*
rm -rf /var/BlackmagicDesign/DaVinci Resolve
```
После установи снова. 

Если не помогло, то я не знаю, что тебе делать :/
