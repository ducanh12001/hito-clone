const notices = [
  '当日のキャンセルはできません',
  '予約時間の15分前から入室可能です',
  '予約時間を超過した場合は追加料金が発生します',
  '施設内での飲食は可能ですが、ゴミはお持ち帰りください',
];

const cancellationPolicies = [
  { period: '予約日の3日前まで', fee: '無料' },
  { period: '2日前〜前日', fee: '50%' },
  { period: '当日', fee: '100%' },
];

export const NoticeSection = () => {
  return (
    <div className="text-sm text-[#717171]">
      <ul className="list-inside list-disc pl-2 marker:text-[10px]">
        {notices.map((notice, index) => (
          <li key={index}>{notice}</li>
        ))}
      </ul>

      <p className="font-bold">キャンセルポリシー</p>
      <ul className="list-inside list-disc pl-2 marker:text-[10px]">
        {cancellationPolicies.map((policy, index) => (
          <li key={index}>
            {policy.period} :{policy.fee}
          </li>
        ))}
      </ul>
    </div>
  );
};
