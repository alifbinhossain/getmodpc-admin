import React, { useState } from 'react';

import SelectFolders from './select-folders';
import { UploadFiles } from './upload-files';

type Props = {
  onUploadSuccess?: () => void;
  onClose?: (isRefreshData?: boolean) => void;
};
function UploadTab({ onClose, onUploadSuccess }: Props) {
  const [selectFolder, setSelectedFolder] = useState<string>('');
  return (
    <>
      {selectFolder ? (
        <UploadFiles
          folder={selectFolder}
          onUploadSuccess={onUploadSuccess}
          onClose={onClose}
          onBack={() => setSelectedFolder('')}
        />
      ) : (
        <SelectFolders
          setSelectedFolder={setSelectedFolder}
          selectFolder={selectFolder}
        />
      )}
    </>
  );
}

export default UploadTab;
