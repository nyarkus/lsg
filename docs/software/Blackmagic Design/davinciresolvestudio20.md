# DaVinci Resolve Studio 20
1. Качаем [отсюда](https://www.blackmagicdesign.com/products/davinciresolve). Если прошло уже много лет и 20 версия не актуальна - качаем [отсюда](https://www.blackmagicdesign.com/support/)
2. Перекидываем архив в путь ~/.cache/yay/davinci-resolve-studio/
3. Смотрим, чтобы на root диске было >~50 гигабайт. 
!!! seealso
    Можно прописать `yay -Sc` чтобы почистить кеш
4. Устанавливаем пакет !aurpkg[davinci-resolve-studio] 
5.  Крякаем давинчи:
```bash
sudo /usr/bin/perl -pi -e 's/\x74\x11\xe8\x21\x23\x00\x00/\xeb\x11\xe8\x21\x23\x00\x00/g' /opt/resolve/bin/resolve
```

## Troubleshooting
### Кряк не сработал
Такое возможно, выполни это:
```bash
cd /opt/resolve/libs && sudo mkdir disabled-libraries && sudo mv libglib* libgio* libgmodule* disabled-libraries
```