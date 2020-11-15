interface File {
  id: string;
  name: string;
}

interface Folder {
  id: string;
  name: string;
  files: Array<File>;
}

// Please update this type as same as with the data shape.
type List = Array<Folder>;

export default function move(list: List, source: string, destination: string): List {
  /* throw new Error('Not implemented'); */

  const tempList = [...list];

  let sourceFile: File | null | undefined;

  if (!list) throw new Error('List is not defined');
  if (!source) throw new Error('Source is not defined');
  if (!destination) throw new Error('Destination is not defined');

  const sourceFolder: Folder | null | undefined = list.find((folder, folderIndex) => {
    if (!folder.files || folder.files.length === 0) return false;
    sourceFile = folder.files.find((file, fileIndex) => {
      if (file.id === source) {
        tempList[folderIndex].files.splice(fileIndex, 1);
      }
      return file.id === source;
    });
    return sourceFile;
  });

  if (!sourceFolder) {
    if (list.find((folder) => folder.id === source)) {
      throw new Error('You cannot move a folder');
    }

    throw new Error('The file is not exist');
  }

  const destinationFolder: Folder | null | undefined = list.find((folder, folderIndex) => {
    if (folder.id === destination && sourceFile) {
      tempList[folderIndex].files.push(sourceFile);
    }
    return folder.id === destination;
  });

  if (!destinationFolder) {
    if (
      list.find((folder) => {
        if (!folder.files || folder.files.length === 0) return false;
        return folder.files.find((file) => file.id === destination);
      })
    ) {
      throw new Error('You cannot specify a file as the destination');
    }

    throw new Error('The destination folder is not exist');
  }

  return tempList;
}
