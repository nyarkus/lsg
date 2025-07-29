# Пиратка с онлайн фикса
Чтобы запустить такую пиратку с **Proton** нужно дописать это в аргументы запуска:
```
WINEDLLOVERRIDES="OnlineFix64=n;SteamOverlay64=n;winmm=n,b;dnet=n;steam_api64=n" %command%
```