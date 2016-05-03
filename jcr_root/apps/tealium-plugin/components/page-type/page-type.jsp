<%@page session="false"%>
<%@include file="/libs/foundation/global.jsp"%>
<cq:includeClientLib js="cq.jquery"/>

<%@page import="org.apache.sling.commons.json.JSONObject" %>

<%
            Property property = null;
            boolean isUDOmultiple = false;

            if(currentNode.hasProperty("udo")){
                property = currentNode.getProperty("udo");
                isUDOmultiple = property.isMultiple();
            }
%>

<c:set var="enableCustomUDO" value="${not empty properties['enableCustomUDO']}" scope="page" />

<div class="tealium-page-type-container">

    <div class="left">
        <img src="/content/dam/tealium-plugin/Tealium config.png">
    </div>

    <div class="right">
        <div class="configuration-entity">
            Page template path: <span class="entity-value"> ${properties['templatePath']} </span>
        </div>
        <div class="configuration-entity">
           Custom UDO is enabled: <span class="entity-value"> ${enableCustomUDO} </span>
        </div>
        <div class="configuration-entity <c:if test='${not enableGlobalCustomUDO || not enableCustomUDO}'>disabled</c:if>">
            UDO:
            <ul>
                <c:if var="multipleUDO" test="<%=isUDOmultiple%>" >
                    <c:forEach var="udo" items="${properties['udo']}">
                        <li class="entity-value" data-udo-value='${udo}'></li>
                    </c:forEach>
                </c:if>
                <c:if test="${not multipleUDO}">
                    <li class="entity-value" data-udo-value='${properties["udo"]}'></li>
                </c:if>
           </ul>
        </div>
    </div>

</div>