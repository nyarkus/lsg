import markdown
from markdown.inlinepatterns import InlineProcessor
from markdown.extensions import Extension
import xml.etree.ElementTree as etree

class PkgInlineProcessor(InlineProcessor):
    def handleMatch(self, m, data):
        package_name = m.group(1)
        command_to_copy = f"sudo pacman -S {package_name}"

        wrapper = etree.Element('span')
        wrapper.set('class', 'pkg-command pkg-type-repo')
        wrapper.set('onclick', f"navigator.clipboard.writeText('{command_to_copy}')")
        wrapper.set('title', f'Нажмите, чтобы скопировать: {command_to_copy}')

        pkg_name_el = etree.Element('span')
        pkg_name_el.set('class', 'pkg-name')
        pkg_name_el.text = package_name
        wrapper.append(pkg_name_el)

        pkg_name_el.tail = ' '

        pkg_label = etree.Element('span')
        pkg_label.set('class', 'pkg-label')
        pkg_label.text = 'PKG'
        wrapper.append(pkg_label)

        return wrapper, m.start(0), m.end(0)

class AurPkgInlineProcessor(InlineProcessor):
    def handleMatch(self, m, data):
        package_name = m.group(1)
        command_to_copy = f"yay -S {package_name}"

        wrapper = etree.Element('span')
        wrapper.set('class', 'pkg-command pkg-type-aur')
        wrapper.set('onclick', f"navigator.clipboard.writeText('{command_to_copy}')")
        wrapper.set('title', f'Нажмите, чтобы скопировать: {command_to_copy}')

        pkg_name_el = etree.Element('span')
        pkg_name_el.set('class', 'pkg-name')
        pkg_name_el.text = package_name
        wrapper.append(pkg_name_el)

        pkg_name_el.tail = ' '

        aur_label = etree.Element('span')
        aur_label.set('class', 'aur-label')
        aur_label.text = 'AUR'
        wrapper.append(aur_label)
        
        return wrapper, m.start(0), m.end(0)

class PkgExtension(Extension):
    def extendMarkdown(self, md):
        PKG_RE = r'!pkg\[(.*?)\]'
        AUR_PKG_RE = r'!aurpkg\[(.*?)\]'

        md.inlinePatterns.register(PkgInlineProcessor(PKG_RE, md), 'pkg', 175)
        md.inlinePatterns.register(AurPkgInlineProcessor(AUR_PKG_RE, md), 'aurpkg', 175)

def makeExtension(**kwargs):
    return PkgExtension(**kwargs)