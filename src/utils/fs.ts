import experienceText from "../assets/experience.txt?raw";
import courseworkText from "../assets/coursework.txt?raw";

type FileNode = {
    type: "file",
    content: string
}

type DirectoryNode = {
    type: "directory",
    children: Record<string, FileSystemNode>
}

type FileSystemNode = FileNode | DirectoryNode

export const FileSystemRoot: DirectoryNode = {
    type: "directory",
    children: {
        "coursework.txt": {
            type: "file",
            content: courseworkText
            // content: "coursework contents"
        },
        
        "experience.txt": {
            type: "file",
            content: experienceText
            // content: "experience contents"
        },
    
        "projects": {
            type: "directory",
            children: {
                "HonoursProject.md": {
                    type: "file",
                    content: "Honours Project..."
                },
                "ImageWebScraper.md": {
                    type: "file",
                    content: "Image Web Scraper..."
                },
                "MiniRadar.md": {
                    type: "file",
                    content: "Mini Radar..."
                },
                "RealWheel.md": {
                    type: "file",
                    content: "Real Wheel..."
                },
                "PortfolioWebsite.md": {
                    type: "file",
                    content: "Porfolio Website..."
                }
            }
        }

    }
}

// ============================
// ===== FS Command Logic =====
// ============================
function resolvePath(path: string[], fs: DirectoryNode): FileSystemNode | null {
    let node: FileSystemNode = fs
    for (const part of path) {
        if (node.type !== "directory" || !node.children[part]) return null
        node = node.children[part]
    }
    return node
}

export function pwd(path: string[]): string {
    return "/" + path.join("/")
}

export function ls(path: string[], fs: DirectoryNode): string {
    const node = resolvePath(path, fs)
    if (node?.type !== "directory") return "Not a directory"
    return Object.keys(node.children).join(" ")
}

export function cd(path: string[], dir: string, fs: DirectoryNode): { newPath: string[], output?: string } {
    if (dir === "..") {
        if (path.length > 0) path.pop()
        return { newPath: path }
    } else if (dir === ".") {
        return { newPath: path }
    }

    const newPath = [...path, dir]
    const node = resolvePath(newPath, fs)

    if (node?.type !== "directory") {
        return { newPath: path, output: `cd: ${dir}: No such directory.` }
    }

    return { newPath: newPath }
}

export function cat(path: string[], fileName: string, fs: DirectoryNode): string {
    const dir = resolvePath(path, fs)
    if (dir?.type !== "directory") return "Current path is not a directory"

    const file = dir.children[fileName]
    if (!file) return `cat: ${fileName}: No such file or directory`
    if (file.type === "directory") return `cat: ${fileName}: Is a directory`

    return file.content
}
