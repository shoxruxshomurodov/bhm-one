import React, { Component } from "react";
import Hat from "../../../components/Hat/Hat";
import Tabs from "../components/Tabs";
import WithUser from '../../../services/auth/rbac/WithUser';
class UpdateLayout extends Component {
  render() {
      const {children} = this.props;
    return (
      <>
        <Hat name="Видео юклаш" desc="Монитор учун видео ва текс юклаш" />
        <div className="page-content">
          <div className="padding">
          <WithUser>
						{({ userCan }) => {
							return (
                <Tabs userCan={userCan} />
							);
						}}
					</WithUser>
           {children}
          </div>
        </div>
       
      </>
    );
  }
}

export default UpdateLayout;
