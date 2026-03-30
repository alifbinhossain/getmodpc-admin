export const paginatedParams = (
  searchParams: { [key: string]: string | string[] | undefined }
) => {
  const obj: Record<string, any> = {};

  for (const key in searchParams) {
    let value = searchParams[key];

    if (Array.isArray(value)) value = value[0];

    if (value === 'true') obj[key] = true;
    else if (value === 'false') obj[key] = false;
    else if (!isNaN(Number(value))) obj[key] = Number(value);
    else obj[key] = value;
  }

  return obj;
};