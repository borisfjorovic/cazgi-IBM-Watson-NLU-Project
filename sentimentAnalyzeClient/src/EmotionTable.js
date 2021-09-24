import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      const emotions = this.props.emotions;
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
              Object.keys(emotions).map((key) => {
								return (
									<tr key={key}>
										<td>
											{key}
										</td>
										<td>
											{emotions[key]}
										</td>
									</tr>
								)
							})
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;