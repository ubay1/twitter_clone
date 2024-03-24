import type { IListData } from '$lib/types/components';

// prettier-ignore
export const constantFooterAuthPage: string[] = ['About', 'Download the X app', 'Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Ads info', 'Blog', 'Status', 'Careers', 'Brand Resources', 'Advertising', 'Marketing', 'X for Business', 'Developers', 'Directory', 'Settings', '© 2024 X Corp.'];


export function getConstantData() {
  const tempData: IListData[] = [];

  for (let i = 1; i <= 100; i++) {
    const label = 'Data ' + i;
    const value = i;

    const entry = {
      label: label,
      value: value
    };

    tempData.push(
      entry as unknown as {
        label: string;
        value: string;
      }
    );
  }
  return tempData;
}