import { EthereumAddress, useProfilesOwnedBy, ProfileFragment, useActiveProfileSwitch } from "@lens-protocol/react";
import { useState } from "react";

import { LoginButton } from "../components/auth/LoginButton";
import { WhenLoggedInWithProfile, WhenLoggedOut } from "../components/auth/auth";
import { ErrorMessage } from "../components/error/ErrorMessage";
import { Loading } from "../components/loading/Loading";

type ProfilesSwitcherProps = {
  address: EthereumAddress;
  current: ProfileFragment;
};

function ProfilesSwitcher({ address, current }: ProfilesSwitcherProps) {
  const { execute: switchProfile, isPending } = useActiveProfileSwitch();
  const [selected, setSelected] = useState<string>(current.id);
  const { data, error, loading } = useProfilesOwnedBy({ address, limit: 50 });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void switchProfile(selected);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (data.length === 0) {
    return <p>No profiles found</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      {data.map(profile => (
        <label key={profile.id}>
          <input
            type="checkbox"
            name="profile"
            value={profile.id}
            checked={profile.id === selected}
            onChange={() => setSelected(profile.id)}
          />
          &nbsp;
          {profile.handle}
        </label>
      ))}
      <button style={{ marginLeft: "1vw", marginBottom: "2vh" }}>{isPending ? "Saving..." : "Submit"}</button>
    </form>
  );
}

export function UseActiveProfileSwitch() {
  return (
    <div>
      <WhenLoggedInWithProfile>
        {({ profile, wallet }) => <ProfilesSwitcher address={wallet.address} current={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
