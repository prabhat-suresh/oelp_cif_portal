export default function UserProfile({ params }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <hr />
      <p className="text-4xl">
        <span className=" ml-2 rounded bg-green-100 p-2 text-black">
          {params.id}'s Profile
        </span>
      </p>
      <a href="/equipments" className="touch-pan-down bg-clip-padding">
        Book Equipments
      </a>
    </div>
  );
}
