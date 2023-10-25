import React, {JSX} from "react";
import {CubesAttributes, CubesAttributesList, CubesRouteTypeCn, SegmentationType, SegmentationTypeList} from "../../components/cube/cube_map";
import {SetBackGround} from "../../components/utils/background";
import {CubeIcon} from "../../components/icon/cube_icon";

class Projects extends React.Component {

    componentDidMount() {
        SetBackGround("")
    }

    render() {
        let body: JSX.Element[] = []

        SegmentationTypeList().forEach((typ: SegmentationType) => {

            body.push(<tr key={typ}>
                <th colSpan={4}>{typ}</th>
            </tr>)

            let index = 1
            CubesAttributesList.forEach((project: CubesAttributes) => {
                if (project.Segmentation !== typ) {
                    return
                }
                body.push(
                    <tr key={typ + project.Cubes}>
                        <td>{index}</td>
                        <td>{CubeIcon(project.Cubes)}{project.Cn}</td>
                        <td>{project.Cubes}</td>
                        <td>{CubesRouteTypeCn(project.RouteType)}</td>
                    </tr>
                )
                index += 1
            })
        })

        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>项目</th>
                    <th>英文名</th>
                    <th>轮次</th>
                </tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        )
    }
}


export default Projects;